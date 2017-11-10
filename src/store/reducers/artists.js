import C from "../../constants";
import initialState from "../initialState";
var  _ = require("lodash");


const artistsReducer = (currentstate,action) => {
	var newstate;
  switch(action.type){
    case C.REQUEST_ARTISTS_DATA:
      return Object.assign({}, currentstate, {
        state: "requesting"
      });
    case C.RECEIVE_ARTISTS_DATA:
			return Object.assign({},currentstate,{
				hasreceiveddata: true,
        items: action.items,
        page: action.page,
        pageSize: action.pageSize,
        total: action.total,
        receivedAt: action.receivedAt
      });

    case C.REQUEST_ARTIST_DATA:
      return Object.assign({}, currentstate, {
        selectedArtist: {
          artist: {},
          hasreceiveddata: false,
        },
      });
    case C.RECEIVE_ARTIST_DATA:
			return Object.assign({},currentstate,{
        selectedArtist: {
          artist: action.artist,
				  hasreceiveddata: true,
          receivedAt: action.receivedAt
        }
      });
    case C.AWAIT_NEW_ARTIST_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: true
			});
		case C.RECEIVE_NEW_ARTIST_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: false
			});
		case C.START_ARTIST_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.EDITING_ARTIST;
			return newstate;
		case C.FINISH_ARTIST_EDIT:
			newstate = _.cloneDeep(currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_ARTIST_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.SUBMITTING_ARTIST;
			return newstate;

    default:
      return currentstate || initialState.artists;
	}
};

export default artistsReducer;
