// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BenchDao} from "../src/BenchDao.sol";

contract CounterScript is Script {
    BenchDao public benchdao;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        benchdao = new BenchDao();

        vm.stopBroadcast();
    }
}
