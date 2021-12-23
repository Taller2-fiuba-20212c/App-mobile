import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import { BASE_COLOR } from '../../consts';
import { useGlobalAuthContext } from '../../model/ContextFactory';
import { getConversation, sendMessage } from '../../model/UbademyAPI';
import * as Notifications from 'expo-notifications';

export default function ChatScreen ({ navigation, route }) {
    const [messages, setMessages] = useState([]);
    const appAuthContext = useGlobalAuthContext();
    const notificationListener = useRef();

    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: `${route.params.user.name} ${route.params.user.lastname}`,
          headerLeft: () => (
            <Icon 
              name='arrowleft'
              size={24}
              type='antdesign'
              onPress={() => navigation.goBack()}
              color={BASE_COLOR}
              containerStyle={{ paddingLeft: 20 }}
            />
          ),
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            if (notification.request.content.data?.type === "chat" && notification.request.content.data?.sender === route.params.user.uid) {
                const msg = {
                    _id: notification.date,
                    text: notification.request.content.body,
                    user: getChatUser(notification.request.content.data.sender),
                    sent: true,
                    received: true,
                    pending: false
                };
                setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
            }
        });

        getConversation(appAuthContext.user.uid, route.params.user.uid)
        .then(conv => setMessages(conv.map(m => ({ 
            _id: m.id,
            text: m.msg,
            user: getChatUser(m.sender_uid),
            sent: true,
            received: true,
            pending: false
        }))))
        .catch(e => {
            Alert.alert('Error', "Can't get conversation");
            console.log(e);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
        }
    }, []);

    const getChatUser = (senderId) => {
        if (appAuthContext.user.uid === senderId) {
            return {
                _id: senderId,
                name: `${appAuthContext.user.name} ${appAuthContext.user.lastname}`,
                avatar: getUserImage(appAuthContext.user.image)
            }
        }
        else {
            return {
                _id: senderId,
                name: `${route.params.user.name} ${route.params.user.lastname}`,
                avatar: getUserImage(route.params.user.image)
            }
        }
    }

    const getUserImage = (image) => image ?? "https://es.fxmag.com/images/users/default.png";

    const onSend = useCallback((messages = []) => {
        sendMessage(appAuthContext.user.uid, route.params.user.uid, messages[0].text)
        .then(response => {
            if (response.msg === messages[0].text) {
                setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
            }
        })
        .catch(e => {
            console.log(e);
            Alert.alert('Error', 'Error sending message');
        })
      }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: appAuthContext.user.uid
            }}
        />
    )
}