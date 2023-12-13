(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ;; Mint initial token supply.
      ;; (try! (contract-call? .membership-token mint u9001 sender))
      (try! (contract-call? .membership-token mint u9001 'ST380ANQR0PHRGXQWHN7CYMKC8KSJS2MDBW5KDVB3))
      (print "DAO bootstrapped")
      (ok true)
  )
)