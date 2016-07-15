const requestHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 06dde48a787703eabbb9b42f68ed8b24ab5be606eb03a837637cf47145ebded2',
    };

var api = {    
    fetchUser(userId) {
        var url = 'https://api.dribbble.com/v1/users/' + userId;

        return fetch(url, {
            method: 'GET',
            headers: requestHeader
        }).then((response) => response.json());
    },
    
    fetchShotsForUser(userId) {
        var url = 'https://api.dribbble.com/v1/users/' + userId + '/shots';

        return fetch(url, {
          method: 'GET',
            headers: requestHeader
        }).then((response) => response.json());
    },
  
    fetchShot(shotId) {
          var url = 'https://api.dribbble.com/v1/shots/' + shotId;

          return fetch(url, {
              method: 'GET',
              headers: requestHeader
          }).then((response) => response.json());
    },
  
    fetchCommentsForShot(shotId) {
          var url = 'https://api.dribbble.com/v1/shots/' + shotId + '/comments';
          return fetch(url, {
              method: 'GET',
              headers: requestHeader
          }).then((response) => response.json());
    },
};

export default api;