// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Bench {
    uint public constant MAX_VERDICTS = 12;

    struct Question {
        address seeker;
        string ask;
        string optionA;
        string optionB;
        uint verdictCount; 
        uint8 round;    
        uint votesForA;        
        uint votesForB;       
        bool exists;
        uint createdAt;
    }

    struct Comment {
        address author;
        bool choseA;    
        string text; 
        uint timestamp;
    }

    Question[] public questions;
    mapping(uint => Comment[]) private questionComments;
    mapping(uint => mapping(address => bool)) public hasVoted;

    event QuestionCreated(uint indexed qId, address indexed seeker, string ask, string optionA, string optionB);
    event Voted(uint indexed qId, address indexed juror, bool choseA, string comment);
    event QuestionClosed(uint indexed qId, uint votesForA, uint votesForB);


    function createQuestion(string calldata _ask, string calldata _optionA, string calldata _optionB) external returns (uint qId) {
        require(bytes(_ask).length > 0, "Question text required");
        require(bytes(_optionA).length > 0 && bytes(_optionB).length > 0, "Both options required");

        Question memory q = Question({
            seeker: msg.sender,
            ask: _ask,
            optionA: _optionA,
            optionB: _optionB,
            verdictCount: 0,
            round: 1, 
            votesForA: 0,
            votesForB: 0,
            exists: true,
            createdAt: block.timestamp
        });

        questions.push(q);
        qId = questions.length - 1;

        emit QuestionCreated(qId, msg.sender, _ask, _optionA, _optionB);
    }

    function vote(uint _qId, bool _chooseA, string calldata _comment) external {
        require(_qId < questions.length, "Invalid question id");
        Question storage q = questions[_qId];
        require(q.exists, "Question not found");
        require(!hasVoted[_qId][msg.sender], "Already voted");

        uint maxVotes = (q.round == 1) ? 12 : 18;
        require(q.verdictCount < maxVotes, "Voting closed");

        hasVoted[_qId][msg.sender] = true;
        q.verdictCount++;

        if (_chooseA) q.votesForA++;
        else q.votesForB++;

        questionComments[_qId].push(Comment({
            author: msg.sender,
            choseA: _chooseA,
            text: _comment,
            timestamp: block.timestamp
        }));

        emit Voted(_qId, msg.sender, _chooseA, _comment);

        if (q.verdictCount == 12 && q.round == 1) {
            if (q.votesForA == q.votesForB) {
                q.round = 2;
            } else {
                emit QuestionClosed(_qId, q.votesForA, q.votesForB);
            }
        }

        if (q.verdictCount == 18 && q.round == 2) {
            emit QuestionClosed(_qId, q.votesForA, q.votesForB);
        }
    }

    function totalQuestions() external view returns (uint) {
        return questions.length;
    }

    function getQuestion(uint _qId) external view returns (
        address seeker,
        string memory ask,
        string memory optionA,
        string memory optionB,
        uint verdictCount,
        uint votesForA,
        uint votesForB,
        bool isOpen,
        uint createdAt
    ) {
        require(_qId < questions.length, "Invalid question id");
        Question storage q = questions[_qId];
        seeker = q.seeker;
        ask = q.ask;
        optionA = q.optionA;
        optionB = q.optionB;
        verdictCount = q.verdictCount;
        votesForA = q.votesForA;
        votesForB = q.votesForB;
        uint maxVotes = (q.round == 1) ? 12 : 18;
        isOpen = (q.verdictCount < maxVotes);
        createdAt = q.createdAt;
    }

    function getAnalytics(uint _qId) external view returns (
        uint totalVotes,
        uint votesForA,
        uint votesForB,
        bool isClosed,
        uint remainingSlots
    ) {
        require(_qId < questions.length, "Invalid question id");
        Question storage q = questions[_qId];
        totalVotes = q.verdictCount;
        votesForA = q.votesForA;
        votesForB = q.votesForB;
        uint maxVotes = (q.round == 1) ? 12 : 18;
        isClosed = (q.verdictCount >= maxVotes);
        remainingSlots = (q.verdictCount >= maxVotes) ? 0 : (maxVotes - q.verdictCount);
    }

    function getComments(uint _qId) external view returns (
        address[] memory authors,
        bool[] memory choseA,
        string[] memory texts,
        uint[] memory timestamps
    ) {
        require(_qId < questions.length, "Invalid question id");
        uint len = questionComments[_qId].length;
        authors = new address[](len);
        choseA = new bool[](len);
        texts = new string[](len);
        timestamps = new uint[](len);

        for (uint i = 0; i < len; i++) {
            Comment storage c = questionComments[_qId][i];
            authors[i] = c.author;
            choseA[i] = c.choseA;
            texts[i] = c.text;
            timestamps[i] = c.timestamp;
        }
    }

    function nextUnvotedQuestion(address juror, uint startFrom) external view returns (bool found, uint qId) {
        uint total = questions.length;
        if (startFrom >= total) return (false, 0);

        for (uint i = startFrom; i < total; i++) {
            Question storage q = questions[i];
            uint maxVotes = (q.round == 1) ? 12 : 18;
            if (q.exists && q.verdictCount < maxVotes && !hasVoted[i][juror]) {
                return (true, i);
            }
        }
        return (false, 0);
    }
}