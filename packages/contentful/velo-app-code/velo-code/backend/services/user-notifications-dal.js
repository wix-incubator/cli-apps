import wixData from 'wix-data';

export const adminDBOptions = {
    "suppressAuth": true,
    "suppressHooks": true
};

const COLLECTION_NAME = 'user-notifications';


const dateToDateStr = (date) => {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options);
}

/**
 * Upsert a notification into db.
 *
 * @param {Object} options - The options object.
 * @param {string} options.instanceId - instance id
 * @param {string} options.notificationType - The type of the notification - "TRIAL_ABOUT_TO_END" or "TRIAL_ENDED"
 * @param {Date} [options.notificationDate] - The planned date of the notification (optional)
 * @param {string} [options.notificationStatus] - The status of the notification - "PENDING" (default) or "DONE"
 * 
 * @returns {Promise<Object>} A Promise that resolves with the upserted notification item.
 *
 * @throws {Error} If the upsert operation encounters an error.
 *
 * @example
 * // Example usage:
 * const upsertedNotification = await upsertNotification({
 *   instanceId: '123',
 *   notificationType: 'TRIAL_ENDED',
 *   notificationDate: new Date(),
 *   notificationStatus: 'PENDING'
 * });
 * console.log(upsertedNotification); // { instanceId: '123', notificationType: 'info', ... }
 */
export async function upsertNotification({ instanceId, notificationType, notificationDate, notificationStatus = "PENDING" }) {
    console.log(`[user-notifications-dal:upsert: ${JSON.stringify({instanceId, notificationType, notificationDate})}`);
    try {
        const currentNotification = await getCurrentNotification({ instanceId, notificationType });
        const itemToUpsert = {
                instanceId,
                notificationType,
                rowid: `${instanceId}_${notificationType}`,
                status: notificationStatus,
        };
        if (notificationDate) {
            itemToUpsert.notificationDate = dateToDateStr(notificationDate);
        }
        if (currentNotification) {
            const newItem = {
                ...currentNotification,
                ...itemToUpsert,
             };
            console.log(`[user-notifications-dal:upsert] new item to upsert ${JSON.stringify(newItem)}`);
            let updateItem = await wixData.update(COLLECTION_NAME, newItem, adminDBOptions);    
            console.log(`[user-notifications-dal:upsert] succesfully updated collection=${COLLECTION_NAME} with item=${JSON.stringify(updateItem)}`);
            return updateItem;
            
        } else {
            let insertToInstances = await wixData.insert(COLLECTION_NAME, itemToUpsert, adminDBOptions);    
            console.log(`[user-notifications-dal:upsert] succesfully inserted to collection=${COLLECTION_NAME} an item=${JSON.stringify(insertToInstances)}`);
            return insertToInstances;
        }
    } catch (error) {
        let errorMsg = `[user-notifications-dal:upsert] error in upsert. collection=${COLLECTION_NAME}, error=${error}`;
        console.log(errorMsg);
        throw errorMsg;
    }
}

export async function getCurrentNotification({instanceId, notificationType}) {
    const {items} = await wixData.query(COLLECTION_NAME).eq('instanceId', instanceId).and(wixData.query(COLLECTION_NAME).eq('notificationType', notificationType)).find(adminDBOptions);
    return items?.[0];
}

export async function getPendingItemsForDate(date = new Date()) {
    const dateStr = dateToDateStr(date);
    try {
        const {items} = await wixData.query(COLLECTION_NAME).eq('notificationDate', dateStr).and(wixData.query(COLLECTION_NAME).ne('status', 'DONE')).find(adminDBOptions);
        return items;
    } catch (error) {
        let generalErrorMessage = `[user-notifications-dal:getItem] error getting for date=${dateStr}, error=${JSON.stringify(error)}`;
        console.log(generalErrorMessage);
        return null;
    }
}
