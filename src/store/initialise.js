import {
  SET_ACTION_LOADING_STATE,
  FETCH_TRACKS,
  FETCH_NEXT_PAGE_URL
} from "@/store/action.types";
import { INITIAL_SEARCH } from "@/constants";

export function initialiseStore(store) {
  initialiseSubscribers(store);
  initialiseWatchers(store);
  initialiseState(store);
}

export function initialiseState(store) {
  store.dispatch(FETCH_TRACKS, INITIAL_SEARCH);
}

export function initialiseWatchers() {
  // store.watch(
  //   state => state.getters[""],
  //   (newValue, oldValue) => {}
  // );
}

function initialiseSubscribers(store) {
  store.subscribeAction({
    before: action => {
      if (!action.type) {
        console.log(action.type);
      }
      if ([FETCH_NEXT_PAGE_URL].includes(action.type)) {
        store.dispatch(SET_ACTION_LOADING_STATE, {
          name: action.type,
          loading: true
        });
      }
    },
    after: action => {
      if ([FETCH_NEXT_PAGE_URL].includes(action.type)) {
        store.dispatch(SET_ACTION_LOADING_STATE, {
          name: action.type,
          loading: false
        });
      }
    }
  });
}

// const initialDispatch = store.dispatch;

// overwrite `dispatch` on store so that it additionally tracks
// which function was called last
// this is used so we can retry any given function if auth has expired
// Object.defineProperty(store, "dispatch", {
//   value(name, payload) {
//     console.log("name", name);
//     console.log("payload", payload);

//     // if (name === "FETCH_NEXT_PAGE_URL") {
//     //   store.subscribeAction({
//     //     after: ()
//     //   })
//     // }

//     // store.commit("LAST_DISPATCHED_ACTION", { name, payload });
//     return initialDispatch(...arguments);
//   }
// });
