import Realm from "realm";
import { createRealmContext } from "@realm/react";

/*const oldRealmPath = Realm.defaultPath;
Realm.deleteFile({ path: oldRealmPath });
*/

class RealmNote extends Realm.Object {
  static schema = {
    name: "RealmNote",
    properties: {
      _id: { type: "string", indexed: true },
      title: { type: "string", indexed: true },
      body: { type: "string", indexed: true },
    },
    primaryKey: '_id'
  };
}

const realmConfig = {
  schema: [RealmNote],
};

const rConfig = createRealmContext(realmConfig);

export const RealmProvider = rConfig.RealmProvider;
export const useRealm = rConfig.useRealm;
export const useObject = rConfig.useObject;
export const useQuery = rConfig.useQuery;
