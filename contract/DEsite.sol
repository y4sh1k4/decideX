// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
contract earn2click is Ownable{
    struct Proposal{
        uint256 proposalId;
        string[] imgUrl;
        address owner;
        uint256 price;
        uint256[] votesCount;
        string prompt;
        uint totalVoters;
        address[] voters;
    }
    event amountSend();
    Proposal[] public allProposals;
    uint256 public nextProposalId;
    modifier checkVoter(uint256 _proposalId){
        for(uint256 i=0;i<allProposals[_proposalId].voters.length;i++){
            require(msg.sender!=allProposals[_proposalId].voters[i],"Already voted");
        }
        _;
    }
    constructor() Ownable(msg.sender){}

    function createProposal(string[] memory _imgUrl,uint totalVoters,string memory _prompt) public payable{ 
        uint256[] memory _votesCount=new uint256[](_imgUrl.length);
        address[] memory _voters;
        Proposal memory newProposal = Proposal({
            proposalId:nextProposalId,
            imgUrl : _imgUrl,
            owner:msg.sender,
            price:msg.value,
            votesCount:_votesCount,
            prompt:_prompt,
            totalVoters:totalVoters,
            voters:_voters
        });
        allProposals.push(newProposal);
        nextProposalId++;
    }

    function getProposal(uint _proposalId) public view returns(Proposal memory){
        require(_proposalId<allProposals.length,"proposal Id not valid");
        Proposal memory currentProposal = allProposals[_proposalId];
        return currentProposal;
    }

    function getAllProposal() public view returns(Proposal[] memory){
        Proposal[] memory allProposal = new Proposal[](allProposals.length);
        for(uint i=0;i<allProposal.length;i++){
            allProposal[i]=allProposals[i];
        }
        return allProposal;
    }

    function withdraw(uint index) public onlyOwner{
        delete allProposals[index];
       (bool success,) = payable(msg.sender).call{value:address(this).balance}("");
        require(success);
    }

    function castVote(uint _proposalId, uint _imgIndex) checkVoter(_proposalId) public{
        // require(_proposalId < allProposals.length, "Proposal ID not valid");
        require(_imgIndex < allProposals[_proposalId].imgUrl.length, "Image index not valid");
        allProposals[_proposalId].voters.push(msg.sender);
        allProposals[_proposalId].votesCount[_imgIndex]++;
        (bool success,)=msg.sender.call{value:allProposals[_proposalId].price/allProposals[_proposalId].totalVoters}("");
        require(success);
        emit amountSend();
    }
}