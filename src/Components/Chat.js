import React from "react";
import { chnl_ID, randomBoja, korisnickoIme } from "../Utile";
import Poruke from "./Poruke";
import Person from "./Korisnik";
import Unos from "./Unos";

class Chat extends React.Component {
  state = {
    messages: [],
    members: [],
    member: {
      username: korisnickoIme(),
      color: randomBoja(),
    },
  };
  componentDidMount() {
    this.drone = new window.Scaledrone(chnl_ID, {
      data: this.state.member,
    });

    const room = this.drone.subscribe("observable-room");

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    room.on("message", (message) => {
      const { data, id, timestamp, member } = message;
      const messages = this.state.messages;
      const time = new Date(timestamp * 1000).toLocaleTimeString("hr-HR");
      messages.push({ id, member, text: data, time });
      this.setState({ messages });
    });
    room.on("members", (members) => {
      this.setState({ members });
    });
    room.on("member_join", (member) => {
      const memberList = this.state.members;
      memberList.push(member);
      this.setState({ members: memberList });
    });
    room.on("member_leave", (member) => {
      const memberLeave = this.state.members.filter(
        (memberState) => memberState.id !== member.id
      );
      this.setState({ members: memberLeave });
    });
  }

  render() {
    return (
      <div className="main__container">
        <div className="main__container--sidebar">
          <ul>
            {this.state.members.map((member) => {
              return (
                <Person
                  key={member.id}
                  name={member.clientData.username}
                  color={member.clientData.color}
                />
              );
            })}
          </ul>
        </div>
        <div className="main__container--content">

          <Poruke messages={this.state.messages} currentMember={this.state.member} />
          <Unos onSendMessage={this.onSendMessage} />
        
        </div>
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}
export default Chat;


// dokumentacija i djelovi koda skinuti:
// https://www.scaledrone.com/blog/tutorial-build-a-reactjs-chat-app/
// i 
// https://www.scaledrone.com/blog/javascript-chat-room-tutorial/


