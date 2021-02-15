# frozen_string_literal: true

lines = File.read('./input0.txt').lines(chomp: true)

rules, your_ticket, nearby_tickets =
  lines.chunk { |n| !n.empty? }.to_a.filter { |check, _| check }.map { |_check, content| content }

your_ticket = your_ticket[1]
nearby_tickets = nearby_tickets[1..-1]
rules = rules.map { |line| line.match(/([\w ]+): (\d+)-(\d+) or (\d+)-(\d+)/).captures }

puts your_ticket
puts nearby_tickets
puts rules.inspect

def valid?(rules, num)
  rules.each do |rule|
    _, d1, d2, d3, d4 = rule
    return true if num >= d1.to_i && num <= d2.to_i
    return true if num >= d3.to_i && num <= d4.to_i
  end
  false
end

ans = []

nearby_tickets.each do |str|
  str.split(',').each do |num|
    ans.push(num.to_i) unless valid?(rules, num.to_i)
  end
end

puts ans.sum
