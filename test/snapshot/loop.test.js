var parser = require("../../src/index");

describe("Test loops statements (for, while)", function() {
  describe("test while", function() {
    it("test default form", function() {
      expect(parser.parseEval(`
        while(true) {
          echo "go";
        }
      `)).toMatchSnapshot();
    });

    it("test short form", function() {
      expect(parser.parseEval(`
        while(true):
          echo "short";
        endwhile;
      `)).toMatchSnapshot();
    });
  });

  it("test do", function() {
    expect(parser.parseEval(`
      do {
        echo "something";
      } while(true);
    `, {
      parser: { debug: false }
    })).toMatchSnapshot();
  });

  it("test for", function() {
    expect(parser.parseEval(`
      for($i = 0, $b = 0; $i < 10, $ok; $i++)
      echo $i;
      for(;;):
      echo $ok;
      continue 5;
      continue(5);
      endfor;
    `, {
      parser: { debug: false }
    })).toMatchSnapshot();
  });

  it("test foreach", function() {
    expect(parser.parseEval(`
      foreach(&$foo as $v)
        echo "$k -> $v\n";
      foreach([[1,2], [3,4]] as list($a, $b) => [$c, $d]):
        echo "$a -> $b\n";
      endforeach;
    `, {
      parser: { debug: false }
    })).toMatchSnapshot();
  });
});
