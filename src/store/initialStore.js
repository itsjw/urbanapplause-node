const initialstate = {
	auth: {
		username: null,
		uid: null
	},
	works: {
		hasreceiveddata: false,
		submittingnew: false,
    states: {},
    items: []
  },
  artists: {
		hasreceiveddata: false,
		submittingnew: false,
    states: {},
    items: [],
    selectedArtist: {
      artist: {},
      hasreceiveddata: false
    }
  },
  userprofiles: {
		hasreceiveddata: false,
		submittingnew: false,
    states: {},
    items: []
  },

};

export default initialstate;
