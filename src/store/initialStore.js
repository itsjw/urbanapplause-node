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
  users: {
		hasreceiveddata: false,
		submittingnew: false,
    states: {},
    items: [],
    selectedUser: {
      user: {},
      hasreceiveddata: false
    }
  },

};

export default initialstate;
