import React from "react";

class NewShowForm extends React.Component {
  render() {
    return (
      <div ref="showModal" class="ui basic modal">
        <div class="ui icon header">
          <i class="archive icon" />
          Archive Old Messages
        </div>
        <div class="content">
          <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
          </p>
        </div>
        <div class="actions">
          <div class="ui red basic cancel inverted button">
            <i class="remove icon" />
            No
          </div>
          <div class="ui green ok inverted button">
            <i class="checkmark icon" />
            Yes
          </div>
        </div>
      </div>
    );
  }
}

export default NewShowForm;
