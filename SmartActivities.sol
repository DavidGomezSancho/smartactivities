// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./ERC20.sol";

contract SmartActivities is ERC20 {
  address immutable private contractOwner;
  Activity[] public activities;
  mapping(uint => ActivityStatus) private activitiesStatus;

  struct Activity {
        uint activityId;
        string title;
        string resume;
        string description;
        string ownersName;
        address addrOwner;
        uint256 startActivityDate;
        uint256 endActivityDate;
        uint256 startAllowedJoinActivityDate;
        uint256 endAllowedJoinActivityDate;
  }

  struct ActivityStatus {
        uint activityId;
        mapping(address => bool) inscribed;
        mapping(address => bool) assisted;
        mapping(address => bool) voted;
        uint256 stars;
        uint256 votedCount;
  }

  struct ReducedActivity {
        uint activityId;
        string title;
        string resume;
        uint256 endAllowedJoinActivityDate;
  }

  struct CompleteActivity {
        uint activityId;
        string title;
        string resume;
        string description;
        string ownersName;
        address addrOwner;
        uint256 startActivityDate;
        uint256 endActivityDate;
        uint256 startAllowedJoinActivityDate;
        uint256 endAllowedJoinActivityDate;
        bool inscribed;
        bool assisted;
        bool voted;
        uint256 stars;
        uint256 votedCount;
        uint256 userStars;
  }

  constructor() ERC20("Stars", "STR") {
      _mint(msg.sender, 10**30);
      contractOwner = msg.sender;
  }

  modifier onlyOwner {
      require(msg.sender == contractOwner, "Only owner can call this function");
      _;
  }

  function addActivity(string memory title, string memory resume,
        string memory description,
        string memory ownersName,
        uint256 startActivityDate,
        uint256 endActivityDate,
        uint256 startAllowedJoinActivityDate,
        uint256 endAllowedJoinActivityDate) public{

      require(startActivityDate < endActivityDate && startAllowedJoinActivityDate < endAllowedJoinActivityDate
            && startAllowedJoinActivityDate > block.timestamp && startActivityDate > startAllowedJoinActivityDate
            && startActivityDate != 0, "Dates not valid");

      Activity storage newA = activities.push();
      newA.title = title;
      newA.resume = resume;
      newA.description = description;
      newA.ownersName = ownersName;
      newA.addrOwner = msg.sender;
      newA.activityId = activities.length - 1;
      newA.startActivityDate = startActivityDate;
      newA.endActivityDate = endActivityDate;
      newA.startAllowedJoinActivityDate = startAllowedJoinActivityDate;
      newA.endAllowedJoinActivityDate = endAllowedJoinActivityDate;

      ActivityStatus storage newAS = activitiesStatus[newA.activityId];
      newAS.activityId = newA.activityId;
      newAS.stars = 0;
      newAS.votedCount = 0;

  }

  function getActivities() public view returns (Activity[] memory) {
      return activities;
  }

  function getReducedActivities() public view returns (ReducedActivity[] memory) {
      ReducedActivity[] memory allReducedActivity = new ReducedActivity[](activities.length);
      for(uint i=0; i<activities.length; i++) {
          allReducedActivity[i].activityId = activities[i].activityId;
          allReducedActivity[i].title = activities[i].title;
          allReducedActivity[i].resume = activities[i].resume;
          allReducedActivity[i].endAllowedJoinActivityDate = activities[i].endAllowedJoinActivityDate;
      }
      return allReducedActivity;
  }

  function getCompleteActivity(uint activityId) public view returns (CompleteActivity memory completeActivity) {
      completeActivity.activityId = activities[activityId].activityId;
      completeActivity.title = activities[activityId].title;
      completeActivity.resume = activities[activityId].resume;
      completeActivity.description = activities[activityId].description;
      completeActivity.ownersName = activities[activityId].ownersName;
      completeActivity.addrOwner = activities[activityId].addrOwner;
      completeActivity.startActivityDate = activities[activityId].startActivityDate;
      completeActivity.endActivityDate = activities[activityId].endActivityDate;
      completeActivity.startAllowedJoinActivityDate = activities[activityId].startAllowedJoinActivityDate;
      completeActivity.endAllowedJoinActivityDate = activities[activityId].endAllowedJoinActivityDate;
      completeActivity.inscribed = getInscribed(activities[activityId].activityId, msg.sender);
      completeActivity.assisted = getAssisted(activities[activityId].activityId, msg.sender);
      completeActivity.voted = getVoted(activities[activityId].activityId, msg.sender);

      completeActivity.stars = activitiesStatus[activityId].stars;
      completeActivity.votedCount = activitiesStatus[activityId].votedCount;
      completeActivity.userStars = balanceOf(activities[activityId].addrOwner);
  }

  function getInscribed(uint activityId, address addr) public view returns (bool) {
      return activitiesStatus[activityId].inscribed[addr];
  }

  function inscribeToActivity(uint activityId) public {
      require(activities[activityId].startActivityDate != 0, "Activity does not exist.");
      require(activities[activityId].startAllowedJoinActivityDate < block.timestamp
            && activities[activityId].endAllowedJoinActivityDate > block.timestamp, "Not allowed inscription date");
      activitiesStatus[activityId].inscribed[msg.sender] = true;
  }

  function getAssisted(uint activityId, address addr) public view returns (bool) {
      return activitiesStatus[activityId].assisted[addr];
  }

  function assist(uint activityId) public {
      require(activitiesStatus[activityId].inscribed[msg.sender], "User needs to be inscribed");
      require(activities[activityId].endActivityDate < block.timestamp, "Activity not finished");
      activitiesStatus[activityId].assisted[msg.sender] = true;
  }

  function getVoted(uint activityId, address addr) public view returns (bool) {//TODO es necesario el addr??
      return activitiesStatus[activityId].voted[addr];
  }

  function vote(uint activityId, uint256 starsAmount) public {
      require(starsAmount <= 5, "The maximum number of stars allowed is 5");
      require(activitiesStatus[activityId].assisted[msg.sender], "User needs to be marked as assisted");
      require(activitiesStatus[activityId].voted[msg.sender] == false, "User previously voted");
      approve(msg.sender, 5);
      transferFrom(msg.sender, activities[activityId].addrOwner, starsAmount);
      activitiesStatus[activityId].voted[msg.sender] = true;
      activitiesStatus[activityId].stars += starsAmount;
      activitiesStatus[activityId].votedCount++;

  }

  function addUser(address newUser) onlyOwner public{
      approve(contractOwner, 1000);
      transferFrom(contractOwner, newUser, 1000);
  }

}
