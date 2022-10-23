
import * as SecureStore from 'expo-secure-store';

export async function removeLocalData () {
        await SecureStore.deleteItemAsync('token')
        await SecureStore.deleteItemAsync('user')
      }
    
export async function getLocalData(key : String){
    let result = await SecureStore.getItemAsync('token');

    if (result !== null) {
      return result;
    } 
    return null;

}

export async function saveToLocal(key : string, value : string) {
    await SecureStore.setItemAsync(key, value);
}