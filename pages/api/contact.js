import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    console.log(email,name, message);

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !message ||
      !message.trim() === ""
    ) {
      res.status(400).json({ message: "invalid input" });
      return;
    }

    // store in DB
    const newMessage = {
      email,
      name,
      message
    };

    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://sramtesting1:vFdZLPGxfctda74u@cluster0.ztdrz.mongodb.net/my-site?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      return;
    }
    console.log("created client");
    try {
      const db = client.db();
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;

    } catch (error) {
      client.close();
      res.status(500).json({ message: "could not write" });
      return;
    }
  
  console.log("sending to client");
  client.close();
  res.status(201).json({ message: "successfully stored message", message: newMessage });
  return;
} 

    res.status(200).json({ message: "something went wrong" });
    return;
  }
  
  export default handler;



    
   