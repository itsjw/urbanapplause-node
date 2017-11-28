const initialstate = {
  auth: {
    currently: null,
		email: null,
    uid: null
	},
	works: {
		hasreceiveddata: false,
		submittingnew: false,
    states: {},
    items: [],
    selectedWork: {
      work: {},
      hasreceiveddata: false
    }
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
