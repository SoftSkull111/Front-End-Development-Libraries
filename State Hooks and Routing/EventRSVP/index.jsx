const { useState } = React;

export function EventRSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [dietary, setDietary] = useState("");
  const [additionalGuest, setAdditionalGuest] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const handleInput = (e) => {
    if (e.target.id == "name") {
      setName(e.target.value);
    }
    else if (e.target.id == "email") {
      setEmail(e.target.value);
    }
    else if (e.target.id == "attendees") {
        setAttendees(e.target.value);
    }
    else if (e.target.id == "dietary") {
      setDietary(e.target.value);
    }
    else {
      setAdditionalGuest(e.target.checked);
    }

    }

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation(
      <>
        <h2>RSVP Submitted!</h2>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Number of attendees: {attendees}</p>
        <p>Dietary preferences: {dietary}</p>
        <p>Bringing additional guests: {additionalGuest? "Yes":"None"}</p>
      </>
    );
  }
  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      <h1>Event RSVP Form</h1>
      <label>
      <span>Enter your name: </span>
        <input id="name" type="text" value={name} placeholder="Your name" onChange={(e)=>handleInput(e)} required></input>
      </label><br/>
      <label>
      <span>Enter your email: </span>
        <input id="email" type="email" value={email} placeholder="Your email" onChange={(e)=>handleInput(e)} required></input>
      </label><br/>
      <label>
      <span>Number of attendees: </span>
        <input id="attendees" type="number" value={attendees} placeholder="Number of attendees" min={1} onChange={(e)=>handleInput(e)} required></input>
      </label><br/>
      <label>
      <span>Dietary preferences: </span>
        <input id="dietary" type="text" value={dietary} placeholder="Dietary preferences (optional)" onChange={(e)=>handleInput(e)}></input>
      </label><br/>
      <label>
      <span>Bringing additional guests? </span>
        <input id="additional-guests" type="checkbox" value={additionalGuest} onChange={(e)=>handleInput(e)}></input>
      </label>
      <button type="submit">Submit form</button>
      {confirmation}
    </form>
  );
}