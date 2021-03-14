# frozen_string_literal: true

lines = File
        .read('./input.txt')
        .lines(chomp: true)

def calculate(line)
  value = []
  ops = []

  line.chars do |char|
    case char
    when /[0-9]/
      if ops.last == '+'
        value.push(eval("#{value.pop}#{ops.pop}#{char}"))
      else
        value.push(char)
      end
    when '+', '*', '('
      ops.push(char)
    when ')'
      value.push(eval("#{value.pop}#{ops.pop}#{value.pop}")) until ops.last == '('

      ops.pop

      value.push(eval("#{value.pop}#{ops.pop}#{value.pop}")) if ops.last == '+'
    when ' '
      next
    else raise "unexpected char: #{char}"
    end
  end

  value.push(eval("#{value.pop}#{ops.pop}#{value.pop}")) while ops.length > 0

  value.first
end

pp lines.map { |line| calculate(line) }.sum
