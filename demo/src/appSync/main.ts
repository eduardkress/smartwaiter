import Order from "./Order";
// import listNotes from "./graphql/listNotes";
// import createNote from "./graphql/createNote";
// import updateNote from "./graphql/updateNote";
// import deleteNote from "./graphql/deleteNote";
// import getNoteById from "./graphql/getNoteById";
import createOrder from "@/appSync/createOrder";
import listOrders from "@/appSync/listOrders";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    order: Order;
    orderId: string;
  };
};

export async function handler(
  event: AppSyncEvent
): Promise<Record<string, unknown>[] | Order | string | null | undefined> {
  switch (event.info.fieldName) {
    case "listOrders":
      return await listOrders();
    case "createOrder":
      return await createOrder(event.arguments.order);
    // case "updateNote":
    //   return await updateNote(event.arguments.note);
    // case "deleteNote":
    //   return await deleteNote(event.arguments.noteId);
    // case "getNoteById":
    //   return await getNoteById(event.arguments.noteId);
    default:
      return null;
  }
}