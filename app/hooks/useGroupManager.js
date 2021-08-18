import { useRealmApi } from './useRealmApi';
import { useAuth } from '../providers/AuthProvider';

export function useGroupManager() {
  const { realmUser } = useAuth();
  const callRealmApi = useRealmApi(realmUser);

  // Callers of these functions should be responsible for awaiting the results.

  const createGroup = (name, deviceId) => callRealmApi('createGroup', [name, deviceId.toString()]);

  const leaveGroup = (groupId) => callRealmApi('leaveGroup', [groupId.toString()]);
  
  const removeGroup = (groupId) => callRealmApi('removeGroup', [groupId.toString()]);

  const inviteGroupMember = (groupId, newMemberEmail) => callRealmApi('inviteGroupMember', [groupId.toString(), newMemberEmail]);

  // Since the "deviceId" is optional (if the user declines the invite) we use a default param to not get an exception when calling "deviceId.toString()"
  const respondToInvitation = (groupId, accept, deviceId = '') => callRealmApi('respondToInvitation', [groupId.toString(), accept, deviceId.toString()]);
  
  const removeGroupMember = (groupId, memberId) => callRealmApi('removeGroupMember', [groupId.toString(), memberId.toString()]);

  const setShareLocation = (groupId, shareLocation) => callRealmApi('setShareLocation', [groupId.toString(), shareLocation]);

  return {
    createGroup,
    leaveGroup,
    removeGroup,
    inviteGroupMember,
    respondToInvitation,
    removeGroupMember,
    setShareLocation
  };
}
