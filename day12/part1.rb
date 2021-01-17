arr = File.read('./input.txt').split("\n")

x = 0
y = 0

degree = 0

arr.each do |line|
  #   puts line
  type = line[0]
  num = line[1..line.length].to_i

  if type == 'N'
    y += num
  elsif type == 'S'
    y -= num
  elsif type == 'E'
    x += num
  elsif type == 'W'
    x -= num
  elsif type == 'L'
    degree += num
  elsif type == 'R'
    degree -= num
  elsif type == 'F'
    direction = (degree / 90) % 4
    if direction == 0
      x += num
    elsif direction == 1
      y += num
    elsif direction == 2
      x -= num
    elsif direction == 3
      y -= num
    else
      puts 'interesting'
    end
  else
    puts 'also intersting'
  end
end

puts "x: #{x} y: #{y}"
puts "ans: #{x.abs + y.abs}"
