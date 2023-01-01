pragma solidity >= 0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Main {
    
    //Aditya's IPFS Part
    string geoData;
    
    function set(string memory _geoData) public {
        geoData = _geoData;
    }
    
    function get() public view returns(string memory _geoData) {
        return geoData;
    }
    
    
    //managing COVID Statuses
    mapping(address => bool) public covidStatus;
    
    function getCovidStatus(address userAddress) public view returns (bool) {
        return covidStatus[userAddress];
    }
    
    function changeCovidStatus(address userAddress, bool status) public returns (bool) {
        covidStatus[userAddress] = status;
        return covidStatus[userAddress];
    }
    
    
    //Creating hash table of contacts
    struct ContactList {
        address[] contacts;
    }
    
    mapping(address => ContactList) contactTree;
    
    function addContact(address user, address _contact) public {
        contactTree[user].contacts.push(_contact);
    }
    
    uint256 totalCorona;
    //These two functions return the value secondary corona contacts and first gen
    function setCheckCorona(address user) public returns (uint256) {
        uint256 totalCorona = 0;
        uint256 arrayLength = contactTree[user].contacts.length;
        for (uint i = 0; i < arrayLength; i++) {
            if (covidStatus[contactTree[user].contacts[i]] = true) {
                totalCorona++;
            }
        }
    }

    function getCheckCorona() public view returns (uint256) {
           return totalCorona;
    }

    function clearCheckCorona() public {
        totalCorona = 0;
        
    }
    
    uint256 secondaryCorona;
    function setcheckSecondary(address user) public returns (uint256) {
        uint256 secondaryCorona = 0;
        uint256 arrayLength = contactTree[user].contacts.length;
         for (uint i = 0; i < arrayLength; i++) {
             setCheckCorona(contactTree[user].contacts[i]);
             secondaryCorona = secondaryCorona + getCheckCorona();
         }
         return secondaryCorona;
    }

    function getcheckSecondary(address user) public view returns (uint256) {
        return secondaryCorona;
    }

    function clearCheckSecondary() public {
        secondaryCorona = 0; 
    }
    
    
 
    address[] connections;
    
    // //Need to send a total list of any connected contacts and their corona status
    // function getConnections(address user) public returns (address[][] memory){
    //        connections.push(contactTree[user].contacts); 
    //}

    function setTree(address user) public returns(address[] memory){
        for (uint i = 0; i < contactTree[user].contacts.length; i++) {
            connections.push(contactTree[user].contacts[i]);
        }
        return connections;
    }

    function getTree(address user) public view returns(address[] memory){
        return connections;
    }


    // console.log(coonnections) [][] [[contact1, contact2][contact1 contact2]]
    // bool[] visited;
    // uint256 level = 0;
    
    //address[][] allConnections;

    // function getAllConnections(address user) public returns (address[] memory) {
    //     uint256 arrayLength = contactTree[user].contacts.length;
    //     if (level != 0) {
    //         level = level + 1;
    //     }

    //     for (uint256 i = 0; i < arrayLength; i++) {
    //         if (visited[i]) { // didn't visit
    //             visited[i] = false;
    //             address[] levelConnections = contactTree[user];
    //         }
    //     }
    //     return allConnections;



    // }
     
    function clearArr() public {
        delete connections;
        
    }
}