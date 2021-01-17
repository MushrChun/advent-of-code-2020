# waypoint
$wx=10
$wy=1

# ship
$sx=0
$sy=0


def rotate(action, num)
  order = ['++','-+','--','+-']
  
  if num == 180
    $wx = -$wx
    $wy = -$wy
  elsif num == 90
    x = $wx >= 0 ? '+' : '-'
    y = $wy >= 0 ? '+' : '-'
    
    i = order.index(x+y)
    case action
    when 'L'
      str = order[(i+1)%4]
    when 'R'
      str = order[(i-1)%4]
    end

    twx = (str[0]+$wy.abs.to_s).to_i
    twy = (str[1]+$wx.abs.to_s).to_i
    
    $wx = twx
    $wy = twy
  elsif num == 270
    rotate(action, 180)
    rotate(action, 90)
  else
    puts "ops!, #{num}"
  end
end

def move(num)
  $sx += $wx * num
  $sy += $wy * num
end

File.foreach('./input.txt') do |line|

  type = line[0]
  num = line[1..line.length].to_i
  
  if type == 'N'
    $wy+=num
  elsif type == 'S'
    $wy-=num
  elsif type == 'E'
    $wx+=num
  elsif type == 'W'
    $wx-=num
  elsif type == 'L' || type == 'R'
    rotate(type,num)
  elsif type == 'F'
    move(num)
  else
    puts 'also ops!'
  end
    
  # puts type  #
  # puts num
end

puts '$wx:', $wx, '$wy:', $wy 

puts '$sx:', $sx, '$sy:', $sy 

puts 'ans:', $sx.abs + $sy .abs
