var LastSeenComponent = React.createClass({
  getInitialState: function() {
    return {data: 'Unknown'};
  },
  getLocation: function() {
    console.log("Fetching location...");
    this.setState({
      data: "Fetching location..."
    });
    var setLocation =  this.setLocationState;
    $.ajax({
      url: 'https://otgqnsn74l.execute-api.us-east-1.amazonaws.com/prod/Locator',
      success: function(result) {
        if (result.meta.status == 200) {
          setLocation(result);
        }
      },
      error: function(error) {
        console.log("Error: " + JSON.stringify(error));
        setLocation({
          "where": {
              "code": "XX",
          }
        });
      }
    });
  },
  componentDidMount: function() {
      // Do this when we mount this component
      this.getLocation();
  },
  setLocationState: function(location) {
    var countrycode = location.where.code;
    var location_string = "";
    if (countrycode != "XX") {
      if (location.where.city != undefined) {
        location_string = location.where.city + ", ";
      }
      location_string = location_string + location.where.country;
      if (location.where.lastseen_timestamp != undefined) {
        var currentTime =  Math.floor(new Date().getTime() / 1000);
        var TimeDiff = currentTime - parseInt(location.where.lastseen_timestamp);
        if (TimeDiff < 259200) { // Less than 3 days
          location_string = location_string + " " + moment.unix(parseInt(location.where.lastseen_timestamp)).fromNow();
        } else {
          location_string = location_string;
        }
      }
      var timestamp = location.where.lastseen_timestamp;

      this.setState({
        data: location_string
      });
    } else {
      this.setState({
        data: "Error fetching location"
      });
    }
  },
  render: function() {
    return (
      <p>
        <i className="fa fa-location-arrow"></i> Last Seen: {this.state.data}
      </p>
    );
  }
});


ReactDOM.render(
  <LastSeenComponent />,
  document.getElementById("lastseen")
);
