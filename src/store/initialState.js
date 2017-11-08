const initialstate = {
	auth: {
		username: null,
		uid: null
	},
	works: {
		hasreceiveddata: false,
		submittingnew: false,
    states: {},
    data: {ok: 'ok'} // this will contain firebase data
  },
  artists: {
		hasreceiveddata: false,
		submittingnew: false,
    states: {},
    data: {ok: 'ok'} // this will contain firebase data
  },
  userprofiles: {
		hasreceiveddata: false,
		submittingnew: false,
    states: {},
    data: {ok: 'ok'} // this will contain firebase data
  },

};

export default initialstate;
