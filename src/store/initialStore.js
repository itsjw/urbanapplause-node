const initialstate = {
  auth: {
    registrationStatus: 'ready',
    registrationErrors: [],
    loginError: null,
    currently: null,
    user: {},
    expires: null
	},
	works: {
    hasreceiveddata: false,
    newimages: [],
		submittingnew: false,
    states: {},
    items: [],
    selectedWork: {
      work: {},
      hasreceiveddata: false
    },
    newWorkErrors: {}
  },
  comments: {},
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
