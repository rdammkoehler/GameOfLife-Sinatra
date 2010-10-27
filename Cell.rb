class Cell
  
  attr_accessor :state
  
  def initialize
    @state = false
  end
  
  def determineState(neighborCount) 
    (state ? [2,3] : [3]).include? neighborCount
  end
  
  def ==(b)
    @state == b.state
  end
  
  def to_s
    state ? "1" : "0"
  end
  
end