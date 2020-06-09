
class SessionStorage
{
    setSession(variableName, value)
    {
        sessionStorage.setItem(variableName, value)
        var confirm =sessionStorage.getItem(variableName);
        return( 
            confirm ? 
            {
                isSuccess: true,
                message: "Session "+variableName+" set with value "+confirm,
            }
            :
            {
                isSuccess: false,
                message: "Unable to set session",
            });
    }
    deleteSession(variableName)
    {
        sessionStorage.removeItem(variableName);
        var confirm =sessionStorage.getItem(variableName);
        return( 
            confirm ? 
            {
                isSuccess: true,
                message: "Session "+variableName+" deleted successfully.",
            }
            :
            {
                isSuccess: false,
                message: "Unable to delete the session variable "+variableName,
            });
    }
    getSession(variableName)
    {
        var confirm =sessionStorage.getItem(variableName);
        return( 
            confirm ? 
            {
                isSuccess: true,
                message: "Session "+variableName+" fetched successfully",
                data: confirm
            }
            :
            {
                isSuccess: false,
                message: "Unable to fetch the session variable "+variableName,
            });
    }
}
export default new SessionStorage();