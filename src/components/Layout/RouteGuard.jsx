import UnAuthorized from "./UnAuthorized";

function RouteGuard({ children }) {
  // const { isLoggedIn, isLoading } = useContext(AuthContext);

  // if (isLoading) {
  //   return <></>;
  // }

  // if (!isLoggedIn) {
  if (true) {
    return <UnAuthorized />;
  }

  return children;
}

export default RouteGuard;