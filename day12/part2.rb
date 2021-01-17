arr = File.read('./input.txt').split("\n")

# puts arr.inspect

wx = 10
wy = 1

sx = 0
sy = 0

def rotate(action, num, wx, wy)
  order = ['++', '-+', '--', '+-']

  if num == 180
    wx = -wx
    wy = -wy
  elsif num == 90
    x = wx >= 0 ? '+' : '-'
    y = wy >= 0 ? '+' : '-'

    i = order.index(x + y)
    case action
    when 'L'
      str = order[(i + 1) % 4]
    when 'R'
      str = order[(i - 1) % 4]
    end

    twx = (str[0] + wy.abs.to_s).to_i
    twy = (str[1] + wx.abs.to_s).to_i

    wx = twx
    wy = twy
  elsif num == 270
    wx, wy = rotate(action, 180, wx, wy)
    wx, wy = rotate(action, 90, wx, wy)
  else
    puts "ops!, #{num}"
  end

  [wx, wy]
end

def move(num, wx, wy, sx, sy)
  sx += wx * num
  sy += wy * num

  [sx, sy]
end

arr.each do |line|
  type = line[0]
  num = line[1..line.length].to_i

  if type == 'N'
    wy += num
  elsif type == 'S'
    wy -= num
  elsif type == 'E'
    wx += num
  elsif type == 'W'
    wx -= num
  elsif %w[L R].include?(type)
    wx, wy = rotate(type, num, wx, wy)
  elsif type == 'F'
    sx, sy = move(num, wx, wy, sx, sy)
  else
    puts 'also ops!'
  end
end

puts "wx: #{wx} wy: #{wy}"
puts "sx: #{sx} sy: #{sy}"
puts "ans: #{sx.abs + sy.abs}"
