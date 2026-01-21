#[test_only]
module ticketing_platform::ticketing_platform_tests {
    use ticketing_platform::event;
    use ticketing_platform::ticket;
    use ticketing_platform::attendance;
    use sui::test_scenario;
    use sui::coin;
    use sui::sui::SUI;
    use sui::clock;

    #[test]
    fun test_create_event() {
        let organizer = @0xA;
        let mut scenario = test_scenario::begin(organizer);
        
        {
            event::create_event(
                b"Tech Conference 2024",
                b"Annual technology conference",
                b"San Francisco",
                1000000000, // start time
                2000000000, // end time
                100, // ticket supply
                1000000000, // ticket price (1 SUI)
                b"walrus_blob_123",
                test_scenario::ctx(&mut scenario)
            );
        };

        test_scenario::end(scenario);
    }

    #[test]
    fun test_purchase_ticket() {
        let organizer = @0xA;
        let buyer = @0xB;
        let mut scenario = test_scenario::begin(organizer);
        
        // Create event
        {
            event::create_event(
                b"Tech Conference 2024",
                b"Annual technology conference",
                b"San Francisco",
                1000000000,
                2000000000,
                100,
                1000000000,
                b"walrus_blob_123",
                test_scenario::ctx(&mut scenario)
            );
        };

        // Purchase ticket
        test_scenario::next_tx(&mut scenario, buyer);
        {
            let mut event = test_scenario::take_shared<event::Event>(&scenario);
            let clock = clock::create_for_testing(test_scenario::ctx(&mut scenario));
            let payment = coin::mint_for_testing<SUI>(1000000000, test_scenario::ctx(&mut scenario));
            
            ticket::purchase_ticket(
                &mut event,
                payment,
                b"encrypted_ticket_data",
                &clock,
                test_scenario::ctx(&mut scenario)
            );

            clock::destroy_for_testing(clock);
            test_scenario::return_shared(event);
        };

        test_scenario::end(scenario);
    }
}
