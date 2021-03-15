import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

/** Function to traverse through array to find the message to show */

function DisplayMessage({ name, data }) {
  if (name) {
    let i = 0;
    while (data[i].name !== name) {
      console.log("Entered while" + name);
      i++;
    }
    if (data[i].name === name) {
      return <Message name={data[i].name} desc={data[i].Desc} />;
    }
  } else {
    return <div></div>;
  }
}

/** Function to display message */

function Message({ name, desc }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{desc}</p>
    </div>
  );
}

/** Function to show all the senders name */

function DisplayNotification({ name, status, readHandler }) {
  return (
    <div onClick={() => readHandler(name)}>
      <li style={{ backgroundColor: status === "Unread" ? "Yellow" : "White" }}>
        {name}
      </li>
    </div>
  );
}

class NotificationBox extends React.Component {
  state = {
    notifications: [
      {
        name: "XYZ",
        Desc: "You have a meeting!",
        status: "Read"
      },
      {
        name: "ABC",
        Desc: "Let's go for a lunch",
        status: "Unread"
      },
      {
        name: "LMN",
        Desc: "You are promoted!",
        status: "Unread"
      }
    ],
    /** This is used to display the message on Clicking */
    senderName: ""
  };

  ReadMessage = (name) => {
    let i = 0;
    let temp = this.state.notifications;
    while (temp.length > i) {
      if (temp[i].name === name) {
        temp[i].status = "Read";
        this.setState({ notifications: temp, senderName: name });
        break;
      }
      i++;
    }
  };

  MarkAllRead = () => {
    let temp = this.state.notifications;
    temp.map((sender) => (sender.status = "Read"));
    this.setState({ notifications: temp });
  };

  render() {
    return (
      <div>
        <button onClick={this.MarkAllRead}>Mark All Read</button>
        <ul>
          {this.state.notifications.map((messages) => (
            <DisplayNotification
              name={messages.name}
              status={messages.status}
              readHandler={this.ReadMessage}
              data={this.state.notifications}
            />
          ))}
          <DisplayMessage
            name={this.state.senderName}
            data={this.state.notifications}
          />
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<NotificationBox />, document.getElementById("root"));
