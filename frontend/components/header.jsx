export default function Header()
{
    return (
        <div className="header">
            <span>
            <img src="../assets/civic.png" className="w-22 h-22 m-auto"/>
            <h1 className="text-white text-center font-bold" >Civic Fix</h1>
            </span>
            <span className="flex">
                <img src="../assets/icons/Complaint.svg" className="w-10 h-10"  />
                <img src="../assets/icons/MaleUser.svg"  className="w-10 h-10"/>
            </span>
        </div>
    )
}