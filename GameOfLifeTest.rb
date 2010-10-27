require 'test/unit'
require 'GameOfLife'
require 'Cell'

class GameOfLifeTest < Test::Unit::TestCase
  
  @game
  @cell
  
    def setup
      @game = GameOfLife.new
      @cell = Cell.new
    end
    
    def test_cellShouldDieWhenOverCrowded
      neighbors = 4
      @cell.state = true
      assert_equal false, @cell.determineState(neighbors)
    end
    
    def test_cellShouldNotDieWhenNotOverCrowded
      neighbors = 3
      @cell.state = true
      @cell.determineState neighbors
      assert_equal true, @cell.state
    end
    
    def test_cellShouldDieWhenVeryOverCrowded
      neighbors = 8
      @cell.state = true
      assert_equal false, @cell.determineState(neighbors)
    end
    
    def test_cellShouldDieWhenLonely
      neighbors = 0
      @cell.state = true
      assert_equal false, @cell.determineState(neighbors)
    end
    
    def test_cellShouldDieWhenUnpopular
      neighbors = 1
      @cell.state = true
      assert_equal false, @cell.determineState(neighbors)
    end
    
    def test_cellShouldLiveWhenPopularEnough
      neighbors = 2
      @cell.state = true
      @cell.determineState neighbors
      assert_equal true, @cell.state
    end
    
    def test_cellShouldLiveWhenPopular
      neighbors = 3
      @cell.state = true
      @cell.determineState neighbors
      assert_equal true, @cell.state
    end
    
    def test_cellShouldResurectWhenPopular
      neighbors = 3
      @cell.state = false
      assert_equal true, @cell.determineState(neighbors)
    end
    
    def test_gameShouldFindCell
      setup = (1..5).map { (1..5).map{Cell.new}}
      @game.board = setup
      coord = @game.find setup[3][3]
      assert_equal [3,3], coord
    end
    
    def test_gameShouldNotFindCell
      cell = Cell.new
      setup = (1..5).map { (1..5).map{Cell.new}}
      @game.board = setup
      coord = @game.find cell
      assert_equal [nil,nil], coord
    end
    
    def test_gameShouldRepresentBoardAccuratelyFromSetup
      expected = (1..5).map { (1..5).map{Cell.new}}
      setup = (1..5).map { (1..5).map{Cell.new}}
      @game.board = setup
      assert_equal expected, @game.board
    end
    
    def test_OneOneShouldHaveZeroNeighbors 
      setup = (1..3).map { (1..3).map{Cell.new}}
      setup[1][1].state = true
      @game.board = setup
      assert_equal 0, @game.countNeighbors(setup[1][1])
    end
    
    def test_OneOneShouldHaveOneNeighbor
      setup = (1..3).map { (1..3).map{Cell.new}}
      setup[0][0].state = true
      setup[1][1].state = true
      @game.board = setup
      assert_equal 1, @game.countNeighbors(setup[1][1])
    end
    
    def test_OneOneShouldHaveTwoNeighbors
      setup = (1..3).map { (1..3).map{Cell.new}}
      setup[0][0].state = true
      setup[1][1].state = true
      setup[2][2].state = true
      @game.board = setup
      assert_equal 2, @game.countNeighbors(setup[1][1])
    end
    
    def test_OneOneShouldHaveThreeNeighbors
      setup = (1..3).map { (1..3).map{Cell.new}}
      setup[0][0].state = true
      setup[0][2].state = true
      setup[1][1].state = true
      setup[2][2].state = true
      @game.board = setup
      assert_equal 3, @game.countNeighbors(setup[1][1])
    end
    
    def test_OneOneShouldHaveThreeNeighborsEvenWhenDead
      setup = (1..3).map { (1..3).map{Cell.new}}
      setup[0][0].state = true
      setup[0][2].state = true
      setup[2][2].state = true
      @game.board = setup
      assert_equal 3, @game.countNeighbors(setup[1][1])
    end
    
    def test_ZeroZeroShouldHaveOneNeighbor
      setup = (1..3).map { (1..3).map{Cell.new}}
      setup[0][0].state = true
      setup[1][1].state = true
      @game.board = setup
      assert_equal 1, @game.countNeighbors(setup[0][0])
    end
    
    def test_TwoTwoShouldHaveOneNeighbor
      setup = (1..3).map { (1..3).map{Cell.new}}
      setup[2][2].state = true
      setup[1][1].state = true
      @game.board = setup
      assert_equal 1, @game.countNeighbors(setup[2][2])
    end
    
    def test_TwoTwoShouldHaveZeroNeighbors
      setup = (1..3).map { (1..3).map{Cell.new}}
      setup[2][2].state = true
      setup[0][0].state = true
      @game.board = setup
      assert_equal 0, @game.countNeighbors(setup[2][2])
    end

    def test_gameShouldBlinkABlinker
      expected = (1..5).map { (1..5).map{Cell.new}}
      expected[1][2].state = true
      expected[2][2].state = true
      expected[3][2].state = true
      
      setup = (1..5).map { (1..5).map{Cell.new}}
      setup[2][1].state = true
      setup[2][2].state = true
      setup[2][3].state = true

      @game.board = setup
      @game.step

      assert_equal expected, @game.board
    end

    def test_gameShouldBlinkABlinkerTwice
        expected = (1..5).map { (1..5).map{Cell.new}}
        expected[1][2].state = true
        expected[2][2].state = true
        expected[3][2].state = true
 
        setup = (1..5).map { (1..5).map{Cell.new}}
        setup[1][2].state = true
        setup[2][2].state = true
        setup[3][2].state = true
        
        @game.board = setup
        
        @game.step
        @game.step
        
        assert_equal expected, @game.board
    end
end
