class GameOfLife
  
  attr_accessor :board

  def initialize
    @board = 5.times.map { 5.times.map{Cell.new}}
    puts "createGame"
  end
  
  def step
    step = []
    board.each{|row| row.each{|cell| step.push(cell.determineState(countNeighbors(cell))) }}
    board.each{|row| row.each{|cell| cell.state = step.shift }}
  end

  def countNeighbors(cell)
    ct = 0
    around(find(cell)) { |colIdx,rowIdx| ct += count(colIdx,rowIdx) }
    ct
  end
  
  def around(coord)
    ((coord[0]-1).upto(coord[0]+1)).each {|colIdx|
      ((coord[1]-1).upto(coord[1]+1)).each {|rowIdx|
        yield colIdx, rowIdx unless coord[0] == colIdx and coord[1] == rowIdx
      }
    }
  end
  
  def count(col,row)
    onTheBoard(col,row) && isCellAlive(col,row) ? 1 : 0
  end
  
  def isCellAlive(col,row)
    board[row][col].state == true
  end

  def matchestCountTargetLocation(col,row,coord)
    col == coord[0] && row == coord[1]
  end
  
  def onTheBoard(col,row)
    col >=0 && col < board.length &&
    row >= 0 && row < board[col].length
  end
  
  def find(targetCell)
    col = 0
    row = 0
    board.each {|aRow| (col = aRow.find_index {|cell| targetCell.equal? cell }).nil? ? row += 1 : break }
    [col, col.nil? ? nil : row]
  end
  
  def to_s
    pprt(board)
  end
  
  def pprt(cells)
    s = ""
    cells.each{
      |row| 
      row.each{
        |cell| 
        s += cell.to_s 
      } 
      s += "\n" 
    }
    s
  end
end