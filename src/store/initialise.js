import store from "@/store";
import { FETCH_TRACKS } from "@/store/action.types";
import { INITIAL_SEARCH } from "@/constants";

export function initialiseStore() {
  initialiseState();
  initialiseWatchers();
}

export function initialiseState() {
  store.dispatch(FETCH_TRACKS, INITIAL_SEARCH);
}

export function initialiseWatchers() {
  // store.watch(
  //   state => state.getters[""],
  //   (newValue, oldValue) => {}
  // );
}

// const initialDispatch = store.dispatch;

// // overwrite `dispatch` on store so that it additionally tracks
// // which function was called last
// // this is used so we can retry any given function if auth has expired
// Object.defineProperty(store, "dispatch", {
//   value(name, payload) {
//     store.commit("LAST_DISPATCHED_ACTION", { name, payload });
//     return initialDispatch(...arguments);
//   }
// });
