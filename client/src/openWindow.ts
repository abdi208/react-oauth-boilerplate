import { IUser } from './react-app-env'

function openNewAuthWindow(myUrl: string): Promise<IUser> {
    // Open the new window to our Github login page
    const authWindow: Window = window.open(myUrl, '_blank') as Window

    // Listen for messages on authWindow
    const authPromise: Promise<IUser> = new Promise((resolve, reject) => {
        // Add a listener on original window for a message from the 2nd 
        window.addEventListener('message', (msg) => {
            // Reject if not from our domain
            if (!msg.origin.includes(`${window.location.protocol}//${window.location.host}`)){
                authWindow.close();
                reject('Not allowed')
                
            }
            //Try to resolve the data in some way
            if (msg.data.payload) {
                try {
                    resolve(JSON.parse(msg.data.payload))
                }
                catch(e) {
                    resolve(msg.data.payload)
                }
                finally {
                    authWindow.close()
                }
            } else {
                // NO data was present in the message.
                authWindow.close()
                reject('Unauthorized')
            }
        }, false)
    })
    return authPromise;
}

export default openNewAuthWindow;