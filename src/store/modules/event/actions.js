import anniversaryEvent from '@/api/anniversary-event';
import santaEvent from '@/api/santa-event';
import guests from '@/api/guests';
import present from '@/api/present';
import mutationTypes from '../../types/mutation-types';
import actionTypes from '../../types/action-types';

const actions = {
  [actionTypes.GET_ANNIVERSARY_EVENTS]({ commit }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getMyAnniversaryEvents()
        .then(response => {
          commit(mutationTypes.SET_SS_EVENTS, response.data.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_CURRENT_ANNIVERSARY]({ commit }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getCurrentAnniversaryEvent()
        .then(response => {
          commit(mutationTypes.SET_MY_EVENT, response.data.data || null);
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data[0] || null);
          resolve(!!response.data.data[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_CURRENT_ANNIVERSARY_BY_ID]({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getAnniversaryEvent(eventId)
        .then(response => {
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data || null);
          resolve(!!response.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.CREATE_ANNIVERSARY_EVENT]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .createAnniversaryEvent(payload)
        .then(response => {
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.UPDATE_ANNIVERSARY_EVENT]({ commit }, { payload, eventID }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .updateAnniversaryEvent(payload, eventID)
        .then(response => {
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_SS_EVENTS]({ commit }) {
    return new Promise((resolve, reject) => {
      santaEvent
        .getMySantaEvents()
        .then(response => {
          commit(mutationTypes.SET_SS_EVENTS, response.data.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_CURRENT_SS]({ commit }) {
    return new Promise((resolve, reject) => {
      santaEvent
        .getCurrentSantaEvent()
        .then(response => {
          commit(mutationTypes.SET_CURRENT_SANTA_EVENTS, response.data.data || []);
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data[0] || null);
          resolve(!!response.data.data[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_CURRENT_SS_BY_ID]({ commit }, eventID) {
    return new Promise((resolve, reject) => {
      santaEvent
        .getCurrentSantaEventById(eventID)
        .then(response => {
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data || null);
          resolve(!!response.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_MY_EVENTS]({ commit }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getMyAnniversaryEvents()
        .then(response => {
          commit(mutationTypes.SET_MY_CONFIRMED_EVENT, response.data.data || null);
          resolve(!!response.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_MY_INVITED_EVENTS]({ commit }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getMyInvitedEvents()
        .then(response => {
          commit(mutationTypes.SET_MY_INVITED_EVENTS, response.data.data || []);
          resolve(!!response.data.data[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.CREATE_SS_EVENT]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      santaEvent
        .createSantaEvent(payload)
        .then(response => {
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.UPDATE_SS_EVENT]({ commit }, { payload, eventID }) {
    return new Promise((resolve, reject) => {
      santaEvent
        .updateSantaEvent(payload, eventID)
        .then(response => {
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_INVITED_EVENTS]({ commit }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getMyInvitedEvents()
        .then(response => {
          commit(mutationTypes.SET_INVITED_EVENTS, response.data.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_ANNIVERSARY_GUESTS]({ commit }, eventID) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getAnniversaryEventGuests(eventID)
        .then(response => {
          commit(mutationTypes.SET_EVENT_GUESTS, response.data.data);
          resolve(!!response.data.data[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_SS_GUESTS]({ commit }, eventID) {
    return new Promise((resolve, reject) => {
      santaEvent
        .getSantaGuests(eventID)
        .then(response => {
          commit(mutationTypes.SET_EVENT_GUESTS, response.data);
          resolve(!!response.data.length);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.GET_SS_GIFTEE]({ commit }, eventID) {
    return new Promise((resolve, reject) => {
      santaEvent
        .getSantaGiftee(eventID)
        .then(response => {
          commit(mutationTypes.SET_EVENT_GIFTEE, response.data.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.ADD_ANNIVERSARY_GUESTS]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .addAnniversaryGuest(payload)
        .then(response => {
          const { data } = response.data;
          data.accepted = 0;
          data.notified = 0;
          commit(mutationTypes.ADD_EVENT_GUEST, data);
          resolve(response.data.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.ADD_SS_GUESTS]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      santaEvent
        .addSantaGuest(payload)
        .then(response => {
          commit(mutationTypes.ADD_EVENT_GUEST, response.data.data);
          resolve(response.data.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.DELETE_ANNIVERSARY_GUEST]({ commit, dispatch }, { userID, userIndex, eventID }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .removeAnniversaryGuest(userID)
        .then(response => {
          commit(mutationTypes.DELETE_EVENT_GUEST, userIndex);
          resolve(response.data.message);
        })
        .catch(err => {
          dispatch(actionTypes.GET_ANNIVERSARY_GUESTS, eventID);
          reject(err);
        });
    });
  },
  [actionTypes.DELETE_ANNIVERSARY_GUEST_BY_ID]({ commit, dispatch }, { guestID, eventID }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .removeAnniversaryGuest(guestID)
        .then(response => {
          commit(mutationTypes.DELETE_EVENT_GUEST_BY_ID, guestID);
          resolve(response.data.message);
        })
        .catch(err => {
          dispatch(actionTypes.GET_ANNIVERSARY_GUESTS, eventID);
          reject(err);
        });
    });
  },
  [actionTypes.DELETE_SS_GUEST]({ commit, dispatch }, { userID, userIndex, eventID }) {
    return new Promise((resolve, reject) => {
      santaEvent
        .removeSantaGuest(userID)
        .then(response => {
          commit(mutationTypes.DELETE_EVENT_GUEST, userIndex);
          resolve(response.data.message);
        })
        .catch(err => {
          dispatch(actionTypes.GET_SS_GUESTS, eventID);
          reject(err);
        });
    });
  },
  [actionTypes.DELETE_SS_GUEST_BY_ID]({ commit, dispatch }, { guestID, eventID }) {
    return new Promise((resolve, reject) => {
      santaEvent
        .removeSantaGuest(guestID)
        .then(response => {
          commit(mutationTypes.DELETE_EVENT_GUEST_BY_ID, guestID);
          resolve(response.data.message);
        })
        .catch(err => {
          dispatch(actionTypes.GET_SS_GUESTS, eventID);
          reject(err);
        });
    });
  },
  [actionTypes.GET_ANNIVERSARY_PRESENTS]({ commit, rootState }, eventID) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getAnniversaryEventPresents(eventID)
        .then(response => {
          commit(mutationTypes.SET_EVENT_PRESENTS, {
            userID: rootState.auth.userData.id,
            data: response.data.data,
          });
          resolve(!!response.data[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.ADD_ANNIVERSARY_PRESENT]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .addAnniversaryPresent(payload)
        .then(response => {
          commit(mutationTypes.ADD_EVENT_PRESENT, response.data.data);
          resolve(response.data.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.CHOOSE_ANNIVERSARY_PRESENT]({ dispatch }, { presentID, eventID }) {
    return new Promise((resolve, reject) => {
      present
        .choosePresent(presentID)
        .then(response => {
          if (response?.data?.success) {
            dispatch(actionTypes.GET_ANNIVERSARY_PRESENTS, eventID);
            dispatch(actionTypes.GET_ANNIVERSARY_GUESTS, eventID);

            resolve(response.data);
          }
        })
        .catch(err => reject(err));
    });
  },
  [actionTypes.ACCEPT_ANNIVERSARY_PRESENT]({ commit }, { presentID, actionStatus }) {
    return new Promise((resolve, reject) => {
      present
        .acceptPresent(presentID, { accepted: actionStatus })
        .then(response => {
          commit(mutationTypes.UPDATE_EVENT_PRESENT, response.data.data);
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.SHARE_ANNIVERSARY_PRESENT](_, { presentID, guestsData }) {
    return new Promise((resolve, reject) => {
      present
        .sharePresent(presentID, guestsData)
        .then(response => {
          resolve(response.data.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.UPDATE_ANNIVERSARY_PRESENT_SIGHT]({ commit }, { presentID, payload }) {
    return new Promise((resolve, reject) => {
      present
        .updatePresentSight(presentID, payload)
        .then(response => {
          commit(mutationTypes.UPDATE_EVENT_PRESENT, response.data.data);
          resolve(!!response.data.data);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },
  [actionTypes.DELETE_ANNIVERSARY_PRESENT]({ commit, dispatch }, { presentID, presentIndex, eventID }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .removeAnniversaryPresent(presentID)
        .then(response => {
          commit(mutationTypes.DELETE_EVENT_PRESENT, presentIndex);
          resolve(response.data.message);
        })
        .catch(err => {
          dispatch(actionTypes.GET_ANNIVERSARY_PRESENTS, eventID);
          reject(err);
        });
    });
  },
  [actionTypes.DELETE_ANNIVERSARY_PRESENT_BY_ID]({ commit, dispatch }, { presentID, eventID }) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .removeAnniversaryPresent(presentID)
        .then(response => {
          commit(mutationTypes.DELETE_EVENT_PRESENT_BY_ID, presentID);
          resolve(response.data.message);
        })
        .catch(err => {
          dispatch(actionTypes.GET_ANNIVERSARY_PRESENTS, eventID);
          reject(err);
        });
    });
  },
  [actionTypes.DELETE_ANNIVERSARY_EVENT]({ commit }, eventID) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .removeAnniversaryEvent(eventID)
        .then(response => {
          commit(mutationTypes.DELETE_CURRENT_EVENT);
          resolve(response.data.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.DELETE_SS_EVENT]({ commit }, eventID) {
    return new Promise((resolve, reject) => {
      santaEvent
        .removeSantaEvent(eventID)
        .then(response => {
          commit(mutationTypes.DELETE_CURRENT_EVENT);
          resolve(response.data.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.INVITE_ANNIVERSARY_GUESTS]({ commit }, eventID) {
    return new Promise((resolve, reject) => {
      guests
        .inviteGuests(eventID)
        .then(response => {
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data);
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.INVITE_SS_GUESTS]({ commit }, eventID) {
    return new Promise((resolve, reject) => {
      santaEvent
        .raffleEvent(eventID)
        .then(response => {
          commit(mutationTypes.SET_CURRENT_EVENT, response.data.data);
          resolve(response.data.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.INVITE_GUEST]({ commit }, guestID) {
    return new Promise((resolve, reject) => {
      guests
        .inviteGuest(guestID)
        .then(response => {
          commit(mutationTypes.UPDATE_EVENT_GUEST, response.data.data);
          resolve(response.data.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [actionTypes.UPDATE_GUEST_SIGHT]({ commit }, { guestID, payload }) {
    return new Promise((resolve, reject) => {
      guests
        .updateGuestSight(guestID, payload)
        .then(response => {
          commit(mutationTypes.UPDATE_EVENT_GUEST, response.data.data);
          resolve(!!response.data.data);
        })
        .catch(error => {
          console.warn(error);
          reject(error);
        });
    });
  },
  [actionTypes.ANSWER_INVITATION]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      guests
        .answerInvitations(payload.guest_id, { accepted: payload.accepted })
        .then(response => {
          commit(mutationTypes.UPDATE_INVITATIONS_ACCEPTED, payload);
          resolve(response.data.message);
        })
        .catch(error => {
          console.warn(error);
          reject(error);
        });
    });
  },
  [actionTypes.GET_EVENTS_TOKEN](_, payload) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .getInvitationsEventsFromToken(payload)
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          console.warn(error);
          reject(error);
        });
    });
  },
  [actionTypes.ACCEPT_INVITATION_TOKEN](_, payload) {
    return new Promise((resolve, reject) => {
      anniversaryEvent
        .acceptInvitationsEventsFromToken(payload)
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export default {
  actions,
};
