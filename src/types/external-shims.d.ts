declare module "expo-secure-store" {
  export function getItemAsync(key: string): Promise<string | null>;
  export function setItemAsync(key: string, value: string): Promise<void>;
  export function deleteItemAsync(key: string): Promise<void>;
}

declare module "@react-native-community/netinfo" {
  export type NetInfoState = {
    isConnected: boolean | null;
  };

  export type NetInfoSubscription = () => void;

  const NetInfo: {
    fetch(): Promise<NetInfoState>;
    addEventListener(listener: (state: NetInfoState) => void): NetInfoSubscription;
  };

  export default NetInfo;
}
