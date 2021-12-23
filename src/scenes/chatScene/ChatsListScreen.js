import React, { useEffect, useRef, useState } from 'react';
import { Alert, ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { NormalInput } from '../../components';
import { getChats, searchUsersLike } from '../../model/UbademyAPI';
import ChatsStyles from './ChatsStyles';
import { BASE_COLOR } from '../../consts';
import { useGlobalAuthContext } from '../../model/ContextFactory';
import { ListItem, Avatar } from 'react-native-elements';

export default function ChatsListScreen ({ navigation }) {
    const SEARCH_USER_DELAY = 500;
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [conversations, setConversations] = useState(undefined);
    const searchTimeout = useRef();
    const appAuthContext = useGlobalAuthContext();

    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: 'Chat'
        });
        
        if (appAuthContext.user.uid) {
            getChats(appAuthContext.user.uid)
            .then(chats => setConversations(chats))
            .catch(e => {
                console.log(e);
                Alert.alert("Error retrieving conversations", "There was an error retrieving your conversations");
            })
        }

        return () => {
            clearTimeout(searchTimeout.current);
        }
    }, []);

    const searchUsers = (text) => {
        searchUsersLike(text)
        .then(response => setMatchedUsers(response.filter(u => u.uid !== appAuthContext.user.uid)))
        .catch(e => {
            console.log(e);
            Alert.alert("Error searching", "There was an error searching for users");
        })
    }

    const searchInputChange = (text) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => searchUsers(text), SEARCH_USER_DELAY);
    }

    const openChat = (user) => {
        navigation.push("Chat", { user })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={ChatsStyles.container}>
                <View style={ChatsStyles.text}>
                    <Text style={ChatsStyles.section}>Your conversations</Text>
                </View>
                {conversations === undefined ?
                    <ActivityIndicator size="large" color={BASE_COLOR} />
                :
                    conversations.map(c => 
                        <ListItem key={`chat-${c.user.uid}`} bottomDivider onPress={() => openChat(c.user)}>
                            <Avatar title={c.user.name} source={{ uri: c.user.image == null ? "https://es.fxmag.com/images/users/default.png" : c.user.image }} />
                            <ListItem.Content>
                                <ListItem.Title style={{ color: BASE_COLOR, fontWeight: 'bold' }}>{c.user.name} {c.user.lastname}</ListItem.Title>
                                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="head">{c.msg.msg}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron color={BASE_COLOR} />
                        </ListItem>    
                    )
                }
                <View style={ChatsStyles.text}>
                    <Text style={ChatsStyles.section}>Start a new conversation</Text>
                </View>
                <NormalInput iconName="magnifying-glass" placeholder="Search for user.." onChangeText={searchInputChange} />
                {matchedUsers.map(user =>
                    <ListItem key={`matched-user-${user.uid}`} bottomDivider onPress={() => openChat(user)}>
                        <Avatar title={user.name} source={{ uri: user.image == null ? "https://es.fxmag.com/images/users/default.png" : user.image }} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold' }}>{user.name} {user.lastname}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color="gray" />
                    </ListItem>    
                )}
            </View>
        </ScrollView>
    )
}