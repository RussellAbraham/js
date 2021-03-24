
    function Node(val) {
        this.value = val;
        this.next = null;
    };

   

    function Stack() {
        this.first = null;
        this.last = null;
        this.size = 0;
    };


    Stack.prototype.push = function (val) {
        var newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            var temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
    };

    Stack.prototype.pop = function () {
        if (!this.first) return null;
        var temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    };
