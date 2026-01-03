import req from "express/lib/request.js";
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async () => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // verifying header

    await whook.verify(JSON.stringify(req.body), headers);

    // Getting Data From request Body

    const { data, type } = req.body;

    const userData = {
      _id: data._id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    // switch case from different events

    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted":
        {
          await User.findByIdAndDelete(data.id, userData);
          break;
        }
        break;

      default:
        break;
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error).message;
    res.json({ success });
  }
};

export default clerkWebhooks;
