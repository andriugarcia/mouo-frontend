import firebase from '../firebase'
import db from '../db'
import axios from 'axios'

export const state = () => ({
  sidebar: false,
  clothingAdded: false,
  threeClothes: false,
  moreClothes: false,
  scrollRef: null,
  clothes: [],
  serviceActive: false,
  loading: false,
  passError: false,
  paymentError: false,
  user: {}
})

export const strict = false

export const mutations = {

  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },

  switchLoading (state) {
    state.loading = !state.loading
  },

  setUser (state, data) {
    state.user = data
  },

  switchPassError (state, data) {
    state.passError = true
    setTimeout(() => {
      state.passError = false
    }, 3000)
  },

  setClothingAdded (state, data) {
    state.clothingAdded = data
  },

  setPaymentError (state) {
    state.paymentError = true

    setTimeout(function() {
      state.paymentError = false
    }, 15000)
  },

  setThreeClothes (state, data) {
    state.threeClothes = data
  },

  setClothes (state, data) {
    data.forEach(doc => {
      state.clothes.push(doc)
    })
  },

  clearClothes(state) {
    state.clothes = []
  },

  setMoreClothes (state, data) {
    state.moreClothes = data
  },

  setServiceActive (state, data) {
    state.serviceActive = data
  }
}

export const actions = {

  // getCurrentUser
  //logOut
  //login
  //signin -> Google
  //register

  getCurrentUser: (context) => {
    firebase.auth().onAuthStateChanged(function (authUser) {
      if (authUser) {
        db.collection('users').doc(authUser.email).onSnapshot((user) => {
          if (!user.exists) {
            console.log("User not found")
            context.commit("switchPassError")
          }
          context.commit('setUser', user.data())
          // Si hay parametro, realiza la rutina
          const urlParams = new URLSearchParams(window.location.search);
          const myParam = urlParams.get('update');
          if (myParam) context.dispatch('updateByURL', myParam)
        })

      } else {
        // No user is signed in.
        context.commit('setUser', {})
      }
    });
  },

  fetchServiceActive: (context) => {
    db.collection('statistics').doc('appInfo').get().then((doc) => {
      context.commit('setServiceActive', doc.data().serviceActive)
    })
  },
 
  logOut: () => {
    firebase.auth().signOut()
  },

  addVisit: () => {
      const stateRef = db.collection('statistics').doc('appInfo')

      db.runTransaction((t) => {
        return t.get(stateRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var visits = doc.get('visits')
          visits += 1

          t.set(stateRef, {
            visits: visits
          }, {
            merge: true
          });
        });
      });
    },

    addLog(context, data) {
      const userRef = db.collection('users').doc(data.email)
      db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var array = doc.get('logs');
          array.push({
            text: data.text,
            date: data.date
          })

          t.set(userRef, {
            logs: array
          }, {
            merge: true
          });
        });
      })
    },

  setSize: (context, size) => {
    context.commit('switchLoading', true)
    context.commit('setUser', {
      ...context.state.user,
      size
    })

    return db.collection('users').doc(context.state.user.email).set({
      size
    }, {merge: true})

  },

  addShare: () => {
      const stateRef = db.collection('statistics').doc('appInfo')

      db.runTransaction((t) => {
        return t.get(stateRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var shared = doc.get('shared')
          shared += 1

          t.set(stateRef, {
            shared: shared
          }, {
            merge: true
          });
        });
      });
    },

    addInterested: (context, value) => {
      const stateRef = db.collection('statistics').doc('appInfo')

      db.collection('waiting').doc(value.email).set({
        email: value.email,
        username: value.username,
        age: value.birth,
        city: value.city,
        more: value.more
      })

      db.runTransaction((t) => {
        return t.get(stateRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var interested = doc.get('interested')
          interested += 1

          t.set(stateRef, {
            interested
          }, {
            merge: true
          });
        });
      });
    },

    login: (context, user) => {
      context.commit('setUser', user)
    },

    checkemail: (context, email) => {
      return db.collection('users').doc(email).get().then(user => {
        if (user.exists) return true
        return false
      })
    },

    register: (context, user) => {
      
      db.collection('users').doc(user.email).set(user)

      var docRef = db.collection('statistics').doc('appInfo')

      db.runTransaction((t) => {
        return t.get(docRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.

          var registered = doc.get('registered')

          t.set(docRef, {
            registered: registered + 1
          }, {
              merge: true
            });
        });
      })

      context.dispatch('login', user)
    },

    fetchClothes: (context, data) => {
      
      // var text = data.text
      // var order = data.order
      // var asc = data.asc

      

      var type = data.type
      var brand = data.brand

      // var sizes = data.sizes

      // text, order, type, brand, sizes
      // text-order, text-type, text-brand, text-sizes, order-type, order-brand, order-sizes, type-brand, type-sizes, brand-sizes
      // text-order-type, text-order-brand, text-order-sizes, text-type-brand, text-type-sizes, order-type-brand, order-type-sizes, type-brand-sizes
      // text-order-type-brand, order-type-brand-sizes
      // text-order-type-brand-sizes

      var docRef = db.collection('clothes')

      // if (text != 'Todos') {
      //   docRef = docRef.where("Title", ">=", text)
      // }

      if (brand != 'Todos') {
        docRef = docRef.where("Brand", "==", brand)
      }

      if (type != 'Todos') {
        docRef = docRef.where("Type", "==", type)
      }

      // if (order != 'Fecha') {
      //   docRef = docRef.orderBy(order, (asc) ? "asc" : "desc")
      // }

      // if (sizes) {
      //   docRef = docRef.where("Sizes", "array-contains", sizes)
      // }


      if (context.state.clothes.length == 0) {
        docRef.limit(20).get().then(docs => {
          var clothes = []
          var data = docs.docs


          context.state.scrollRef = data[data.length - 1]
          
          data.forEach(doc => {
            clothes.push(doc.data())
          })
  
          context.commit("setClothes", clothes)
          return clothes
        })
      }

      else {
        try {
          docRef.startAfter(context.state.scrollRef).limit(20).get().then(docs => {
            var clothes = []
            var data = docs.docs
    
            context.state.scrollRef = data[data.length - 1]
  
            data.forEach(doc => {
              clothes.push(doc.data())
            })
  
            context.commit("setClothes", clothes)
            return clothes
          })
        }

        catch(err) {
          console.log("end")
        }
      }


      
    },

    signupPassword: (context, data) => {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then((doc) => {
      })
    },

    authFacebook: (context, email) => {
      context.dispatch('loginFacebook', email).then((result) => {
        if (!result) return false
        return db.collection('users').doc(result.user.email).onSnapshot((doc) => {
          if (doc.data().oAuth) {
            context.commit('setUser', doc.data())
            return true
          }
          return false
        })
      })
    },

    loginPassword: (context, data) => {
      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return firebase.auth().signInWithEmailAndPassword(data.email, data.password).then((doc) => {
          return doc
        }).catch((err) => {
          context.commit("switchPassError")
          return null
        })
      })
    },

    loginGoogle: () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email')

      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return firebase.auth().signInWithPopup(provider).then(function (result) {
          return result
  
        }).catch(function () {
          return firebase.auth().signInWithRedirect(provider).then(function (result) {
            return result
          }).catch(function() {
            console.log("No se ha podido iniciar sesión")
          })
        });

      }).catch(err => {
        console.log(err)
      })

    },

    loginFacebook: () => {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('email')

      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return firebase.auth().signInWithPopup(provider).then(function (result) {
          return result

        }).catch(function () {
          return firebase.auth().signInWithRedirect(provider).then(function (result) {
            return result
          }).catch(function () {
            console.log("No se ha podido iniciar sesión")
          })
        });

      }).catch(err => {
        console.log(err)
      })


    },

    forgotPassword: (context, email) => {
      
      var auth = firebase.auth();

      return auth.sendPasswordResetEmail(email).then(function () {
        return true
      }).catch(function (error) {
        return false
      });

    },

    addClothing: (context, clothing) => {
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newClothingArray = doc.get('temporalList');
          newClothingArray.push(clothing)

          if (newClothingArray.length == 3) {
            context.commit('setThreeClothes', true)
          }
          else if (newClothingArray.length > 3) {
            context.commit('setMoreClothes', true)
          }

          else {
            context.commit('setClothingAdded', true)
          }

          t.set(userRef, {
            temporalList: newClothingArray
          }, {
            merge: true
          });
        });
      })
    },

    rent: (context, data) => {
      axios.get(`https://mouo-backend.herokuapp.com/chargeclient?email=${context.state.user.email}&amount=${data.amount * 100}`).then((res) => {
        if (res.status == '200') {
          db.collection('users').doc(context.state.user.email).set({
            rentList: context.state.user.temporalList,
            temporalList: []
          }, { merge: true })
        }
      })
    },

    
    addPayment: (context, data) => {

      if (!context.state.user.customerInfo) {
        var paymentList = []
        var customerInfo = {}
        return axios.get(`https://mouo-backend.herokuapp.com?email=${context.state.user.email}&src=${data.token.id}`).then((res) => {
          paymentList.push({
            name: data.name,
            selected: true,
            token: data.token
          })
          customerInfo = res.data

          context.state.user.customerInfo = customerInfo
          context.state.user.paymentList = paymentList

          return db.collection('users').doc(context.state.user.email).set({
            customerInfo,
            paymentList
          }, {merge: true})

        }).catch(err => {
          console.log("Error al crear primer pago: ", err)
          context.commit("setPaymentError")
        })
      }

      else {
        // Si existe customer
        return axios.get(`https://mouo-backend.herokuapp.com/update?cus=${context.state.user.customerInfo.id}&src=${data.token.id}`).then(() => {
                const userRef = db.collection('users').doc(context.state.user.email)
          
                // SEGUIR POR AQUI
        
                return db.runTransaction((t) => {
                  return t.get(userRef).then((doc) => {
                    // doc doesn't exist; can't update
                    if (!doc.exists) return;
                    // update the users array after getting it from Firestore.
                    var newPaymentArray = doc.get('paymentList');
                    newPaymentArray.push({
                      name: data.name,
                      selected: false,
                      token: data.token
                    })
        
          
                    t.set(userRef, {
                      paymentList: newPaymentArray
                    }, {
                      merge: true
                    })
                  });
                }).then(() => {
                  context.commit('switchLoading', true);
                })
                .catch(err => {
                  console.log("Error al añadir pago extra: ", err)
                  context.commit("setPaymentError")
                })

        })

      }
    },

    addDirection: (context, data) => {
      context.commit('switchLoading', true)
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newDirectionArray = doc.get('directionList');
          newDirectionArray.push(data)

          t.set(userRef, {
            directionList: newDirectionArray
          }, {
            merge: true
          })
        });
      })
    },

    buyClothing: (context, clothing) => {

      axios.get(`https://mouo-backend.herokuapp.com/chargeclient?email=${context.state.user.email}&amount=${clothing.Price*100}`).then((res) => {
        if (res.status == '200') {
          const userRef = db.collection('users').doc(context.state.user.email)

          return db.runTransaction((t) => {
            return t.get(userRef).then((doc) => {
              // doc doesn't exist; can't update
              if (!doc.exists) return;
              // update the users array after getting it from Firestore.
              var newActualList = doc.get('actualList')
              var newBoughtList = doc.get('bought')
              var newTemporalList = doc.get('temporalList')

              const index = newActualList.findIndex(x => {
                return x.id == clothing.id
              })
              
              newBoughtList.push(clothing)
              
              newActualList.splice(index, 1)

              const temporalIndex = newTemporalList.findIndex(x => {
                return x.id == clothing.id
              })
              if (temporalIndex != -1) {
                newTemporalList.splice(index, 1)
              }

              t.set(userRef, {
                actualList: newActualList,
                bought: newBoughtList,
                temporalList: newTemporalList
              }, {
                merge: true
              });
            });
          })
        }

        else {
          console.log('Ha habido un error en el pago')
        }
      }).catch((err) => {
        console.log('ERROR EN EL SERVIDOR', err)
      })
    },
    
    selectDirection: (context, direction) => {
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newDirectionArray = doc.get('directionList');

          newDirectionArray.forEach(dir => {
            dir.selected = false
            if (dir.direction == direction) {
              dir.selected = true
            }
          })
          

          t.set(userRef, {
            directionList: newDirectionArray
          }, {
            merge: true
          });
        });
      })
    },
    
    selectPayment: (context, token) => {
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newPaymentArray = doc.get('paymentList');

          newPaymentArray.forEach(payment => {
            payment.selected = false
            if (payment.token.id == token) {
              payment.selected = true
            }
          })
          

          t.set(userRef, {
            paymentList: newPaymentArray
          }, {
            merge: true
          });
        });
      })
    },

    removeClothing: (context, index) => {
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newClothingArray = doc.get('temporalList');          
          
          if (index != -1) {
            newClothingArray.splice(index, 1)
          }
          
          t.set(userRef, {
            temporalList: newClothingArray
          }, {
            merge: true
          });
        });
      })
    },

    removeDirection: (context, index) => {
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newDirectionArray = doc.get('directionList');          
          
          if (index != -1) {
            newDirectionArray.splice(index, 1)
          }
          
          t.set(userRef, {
            directionList: newDirectionArray
          }, {
            merge: true
          });
        });
      })
    },

    removePayment: (context, index) => {
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newPaymentArray = doc.get('paymentList');          
          
          if (index != -1) {
            newPaymentArray.splice(index, 1)
          }
          
          t.set(userRef, {
            paymentList: newPaymentArray
          }, {
            merge: true
          });
        });
      })
    },

    restoreList: (context) => {
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newClothingArray = doc.get('actualList');

          t.set(userRef, {
            temporalList: newClothingArray
          }, {
            merge: true
          });
        });
      })
    },

    updateByURL: (context, data) => {
      var array = data.split(',')
      var clothes = []

      var getclothes = array.map(item => {
        const arrayed = item.split('~')

        return db.collection('clothes').doc(arrayed[0]).get().then(doc => {
          if (doc.data()) {
            return {
              ...doc.data(),
              Size: arrayed[1]
            }
          }
        })
      })

      Promise.all(getclothes).then(resultsArray => {
        var clothes = resultsArray.filter(function (el) {
          return el != undefined;
        });
  
        db.collection('users').doc(context.state.user.email).set({
          temporalList: clothes
        }, {merge: true})
      })
      
    },

    updateSuscription: (context) => {
      
      const userRef = db.collection('users').doc(context.state.user.email)

      return db.runTransaction((t) => {
        return t.get(userRef).then((doc) => {
          // doc doesn't exist; can't update
          if (!doc.exists) return;
          // update the users array after getting it from Firestore.
          var newClothingArray = doc.get('temporalList');

          t.set(userRef, {
            nextList: newClothingArray
          }, {
            merge: true
          });
        });
      }).then(() => {
        if (!context.state.user.active) {
          var date = new Date()
          var day = (date.getUTCDate() != 1) ? date.getUTCDate() - 1 : 30
          db.collection('users').doc(context.state.user.email).set({
            active: true,
            payday: (context.state.user.payday == 0) ? day : context.state.user.payday
          }, { merge: true })
          if (context.state.user.payday == 0) {
            axios.get(`https://mouo-backend.herokuapp.com/initSuscription?email=${context.state.user.email}`).catch(console.log('Ha habido un error'))
          }
        }
      })
    },

    cancelSuscription: (context) => {

      db.collection('users').doc(context.state.user.email).set({
        active: false,
        nextList: [],
        temporalList: []
      }, {merge: true})

      var date = new Date()
      context.dispatch('addLog', {
        email: context.state.user.email,
        date,
        text: 'Ha cancelado su subscripción'
      })
      
    }

}
