lines = File.read('./input.txt').split("\n")

mask = nil
mem = {}

lines.each do |line|
  type, addr, txt = line.match(/(\w+)\[?(\d*)\]? = ([\dX]+)/).captures
  # puts "type:#{type}, addr:#{addr}, txt:#{txt}"

  case type
  when 'mask'
    mask = txt
  when 'mem'
    num_str = txt.to_i.to_s(2).rjust(36, '0')

    new_num = []

    num_str.chars.zip(mask.chars).each do |n, m|
      case m
      when 'X'
        new_num.push(n)
      when '1', '0'
        new_num.push(m)
      end
      mem[addr] = new_num.join.to_i(2)
    end
  else
    raise 'unexpected type'
  end
end

puts mem.values.sum
