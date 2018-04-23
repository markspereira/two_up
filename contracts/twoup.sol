pragma solidity ^0.4.14;

contract twoup
{
        
    enum GameState {
        OPEN,   // The game is open for new bets
        CLOSED  // The game is closed to new bets till the payoutWinners function is called
        
        
    }
    
    struct Game //heads addresses, tails addresses, state
    {

        GameState state;
    }
    
    /**
     * Creates a new game and returns the id of the game created.
     * There is no restriction on the number of games that each account can create 
     * or whether an account is already part of another game.
     * 
     * The state of a new game is OPEN.
     * 
     */
    function createGame() returns (uint gameId)
    {
        
    }
    
    /**
     * Used for joining an existing game.
     * Requires:
     *   - game to exist
     *   - account not have already joined the game
     */
    function joinGame(uint gameId)
    {
        
    }

    
    /**
     * Used by an account to bet on head
     * Requires:
     *   - game to exist
     *   - game to be in OPEN state
     *   - account to have either created or joined the game
     *   - account not have already bet on tail or head for the curent game round
     */ 
    function guessHeads(uint gameId)
    {
        
    }
    
    /**
     * Used by an account to be on tail
     * Requires:
     *    - same requirement as guessHeads
     */
    function guessTails(uint gameId) 
    {
        
    }
    
    /**
     * Returns the account that has been selected to spin the coin for the current 
     * game round. 
     * The spinner account must be picked between the accounts that
     * bet on head.
     * Could use future block hash to get randomness.
     */
    function pickSpinner(uint gameId)  constant //pure
    {
        
    }
    
    /**
     * Used to flip the coins. It basically geneate a random number.
     * Transition the game state to CLOSED.
     * 
     * Sets the earliest blocknumber at which the payoutWinners funcion can be 
     * called.
     * 
     * Requires:
     *   - account to be the selected spinner for this game round
     */
    function flipKip(uint gameId, uint hashedSeed) 
    {
        
    }
    
    /**
     * Used to pay the winners.
     * Based on the randomness created by flipKp, 
     * it pays the accounts that bet on head with  probabilty 1/4, 
     * the accounts that bet on tail with probability 1/4, or
     * no account with probability 2/4
     * 
     * Requires:
     *   - account to be the selected spinner for this game round
     *   - hash of the seed to match the hashedSeed parameter provided to the flipKip function
     *   - block number to be higher than or equal to the blocknumber set by the flipKip function 
     * 
     * This function should be called withing 256 blocks from when the flipKip function was called.
     */
    function payoutWinners(uint gameId, uint seed) 
    {
        
    }
}
