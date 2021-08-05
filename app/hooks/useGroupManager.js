import { useAuth } from '../providers/AuthProvider';

function useGroupManager() {
  const { realmUser } = useAuth();

  // We can call our configured MongoDB Realm functions as methods on the User.functions
  // property (as seen below), or by passing the function name and its arguments to
  // User.callFunction('functionName', args).
  // Changes made by the backend will be automatically synced by Realm and reacted to
  // via our change listeners (see /app/providers).
  // (Currently we only show changes once synced from the server, thus not offline)

  // Callers of these functions should be responsible for awaiting the results.

  const createGroup = (name) => realmUser.functions.createGroup(name);

  const leaveGroup = (groupId) => realmUser.functions.leaveGroup(groupId.toString());
  
  const removeGroup = (groupId) => realmUser.functions.removeGroup(groupId.toString());

  const addGroupMember = (groupId, newGroupMemberEmail) => {
    // When the backend inserts new GroupMember into the 'members' array on the Group,
    // it will also insert a GroupMembership into the User's 'groups' array.
    return realmUser.functions.addGroupMember(groupId.toString(), newGroupMemberEmail);
  };

  const removeGroupMember = (groupId, memberId) => realmUser.functions.removeGroupMember(groupId.toString(), memberId.toString());

  const setShareLocation = (groupId, shareLocation) => realmUser.functions.setShareLocation(groupId.toString(), shareLocation);

  // TODO: Implement the backend function setGroupName
  const setGroupName = (name) => {
    // When the backend changes the group name on the Group, it will also change it on the
    // embedded GroupMembership of each of its Users.
    return realmUser.functions.setGroupName(name);
  };

  return {
    createGroup,
    leaveGroup,
    removeGroup,
    addGroupMember,
    removeGroupMember,
    setShareLocation
    /*setGroupName*/
  };
}

export default useGroupManager;
