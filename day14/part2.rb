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
    num_str = addr.to_i.to_s(2).rjust(36, '0')

    new_addrs = [[]]

    num_str.chars.zip(mask.chars).each do |n, m|
      case m
      when '0'
        new_addrs.each { |arr| arr.push(n) }
      when '1'
        new_addrs.each { |arr| arr.push('1') }
      when 'X'
        new_addrs = new_addrs.map { |arr| arr + ['0'] }.concat(new_addrs.map { |arr| arr + ['1'] })
      end
    end

    new_addrs.each do |new_addr|
      # puts addr.join.to_i(2)
      mem[new_addr.join.to_i(2)] = txt.to_i
    end
  else
    raise 'unexpected type'
  end
end

puts mem.values.sum
