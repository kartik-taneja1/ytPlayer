export class SocketEvents {
  public static readonly ON_CONNECT = "connect";
  public static readonly ON_DISCONNECT = "disconnect";
  public static readonly ON_DISCONNECTING = "disconnecting";
  public static readonly ON_INIT = "onInit";
  public static readonly ON_NEW_USER_CONNECT = "onNewUserConnect";
  public static readonly ON_USER_DISCONNECT = "onUserDisconnect";

  public static readonly ON_CREATE_ROOM = "onCreateRoom";
  public static readonly ON_DELETE_ROOM = "onDeleteRoom";

  public static readonly ON_JOIN_ROOM = "onJoinRoom";
  public static readonly ON_LEAVE_ROOM = "onLeaveRoom";
  
  public static readonly ON_MESSAGE = "onMessage";
  public static readonly ON_CHANGE_USERNAME = "changeUsername";

  public static readonly ON_ADD_TO_QUEUE = "onAddSongToQueue";
  public static readonly ON_REMOVE_FROM_QUEUE = "onRemoveSongFromQueue";

  public static readonly ON_PLAYER_STATE_CHANGE = "onPlayerStateChange";
  public static readonly ON_USER_STATE_CHANGE = "onUserStateChange";
}
